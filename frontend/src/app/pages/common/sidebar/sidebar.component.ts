//@Packages
import { Component, OnInit } from '@angular/core';

//@Services
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userName: string;

  constructor(private _storageService: StorageService) { }

  ngOnInit() {
    this.userName = this._storageService.getUserName();
  }

}
