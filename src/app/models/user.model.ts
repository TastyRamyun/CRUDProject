export class User{
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: number;
    permissions: string[];
    address?: string;
    city?: string;
    phone?: number;
    DOB?: string;

  
    constructor(id: number, email: string, password: string,firstName: string,lastName: string, role: number,permissions: string[], address?: string, city?: string,phone?: number,DOB?: string) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.role = role;
      this.permissions = permissions;
      this.address = address;
      this.city = city;
      this.phone = phone;
      this.DOB = DOB;
    }
  }