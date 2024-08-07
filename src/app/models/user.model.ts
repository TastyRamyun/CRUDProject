export class User{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    permissions: string;
    address?: string;
    city?: string;
    phone?: number;
    DOB?: string;

  
    constructor(id: string, firstName: string,lastName: string, email: string, password: string, role: string, permissions: string, address?: string, city?: string,phone?: number,DOB?: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.role = role;
      this.permissions = permissions;
      this.address = address;
      this.city = city;
      this.phone = phone;
      this.DOB = DOB;
    }
  }