export class User{
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions: string;
    address?: string;
    city?: string;
    phone?: string;
    DOB?: string;

  
    constructor(id: string, email: string, password: string, firstName: string,lastName: string, role: string, permissions: string, address?: string, city?: string,phone?: string,DOB?: string) {
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