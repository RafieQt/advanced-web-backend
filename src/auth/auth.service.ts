import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type AuthResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthResponse> {
    const user = await this.customerService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getFullUser(email: string) {
    const user = await this.customerService.getByEmail(email);

    if (!user) return null;

    const { password, ...result } = user;
    return result;
  }
}
