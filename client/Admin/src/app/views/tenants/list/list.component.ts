import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../models/tenant';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tenants$ = new Observable<Tenant[]>();
  tenantData = [];
  isLoading: boolean = true;
  displayedColumns = [
    'tenantId',
    'tenantName',
    'tenantEmail',
    'tenantTier',
    'isActive',
    'Actions'
  ];
  constructor(private tenantSvc: TenantsService) {}

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.isLoading = false;
    this.tenantSvc.fetch().subscribe((response: any) => {
      this.tenantData = response.data;
      this.isLoading = false;
    });
  }

  delete(tenantId: string) {
    this.isLoading = true
    this.tenantSvc.delete(tenantId).subscribe((response: any) => {
      this.isLoading = false;
      this.fetchAll()
    })
  }
}
