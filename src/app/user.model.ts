export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    permissions: string;
    address?: string;
    city?: string;
    phone?: number;
    DOB?: Date;

  
    constructor(id: number, email: string, password: string,name: string, role: string,permissions: string, address?: string, city?: string,phone?: number,DOB?: Date) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
      this.role = role;
      this.permissions = permissions;
      this.address = address;
      this.city = city;
      this.phone = phone;
      this.DOB = DOB;
    }
  }