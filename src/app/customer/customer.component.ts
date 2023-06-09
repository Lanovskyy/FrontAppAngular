import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  success: boolean = false;
  errors!: String[];

  constructor(private service: CustomerService){
  }

  ngOnInit(): void {
    this.saveCustomer();
  }

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthDateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  }

  saveCustomer() {
    
    const datePipe = new DatePipe('en-US');
    this.customer.birthDateCustomer = datePipe.transform(
      this.customer.birthDateCustomer, 'dd/MM/yyyy');
    
    
    this.service.save(this.customer).subscribe({next: () => {
      this.success = true;
      this.errors = [];
    //this.toast.success('O cliente '+ this.customer.firstNameCustomer +' '+ this.customer.lastNameCustomer +' foi cadastrado com sucesso!', 'Cadastro');      
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {
          //this.toast.error(element.message, 'Erro');
        });
      } else {
        //this.toast.error(ex.error.message, 'Erro');
      }
    }})
  }

}