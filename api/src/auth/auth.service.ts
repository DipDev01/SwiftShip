import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(dto: GoogleAuthDto) {
    try {
      // Verify Google ID Token
      const ticket = await this.client.verifyIdToken({
        idToken: dto.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Invalid Google Token');
      }

      // Check if user already exists
      let user = await this.userRepository.findOne({
        where: {
          googleId: payload.sub!,
        },
      });

      // Create new user if not found
      if (!user) {
        const userData: Partial<User> = {
          googleId: payload.sub!,
          email: payload.email!,
          fullName: payload.name!,
          profilePicture: payload.picture ?? '',
          phoneVerified: false,
          isProfileCompleted: false,
        };

        user = this.userRepository.create(userData);

        await this.userRepository.save(user);
      }

      // Generate JWT
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });

      // Return response
      return {
        success: true,
        message: 'Google login successful',
        accessToken,
        user,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Google Authentication Failed');
    }
  }
}
