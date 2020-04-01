export class UserModel {
  user_id: number;
  username: string;
  password: string;
  email: string;
  is_super_user: boolean;
  created_at: Date;
  is_email_verified: boolean;
  token: string;
    static username: any;
}
