import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  googleId!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  fullName!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profilePicture!: string;

  @Column({ nullable: true })
  phoneNumber!: string;

  @Column({ default: false })
  phoneVerified!: boolean;

  @Column({ nullable: true })
  role!: string;

  @Column({ default: false })
  isProfileCompleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
