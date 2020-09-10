export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    valid: boolean;
    
    constructor(id:number=0, username:string='', email:string='', password:string='', role:string='', valid=false){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.valid = valid;
    }
}