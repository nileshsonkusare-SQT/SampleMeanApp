//@Packages
import { Component, OnInit } from '@angular/core';

//@Services
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  
  constructor(private _auth: AuthService,
    private _storageService: StorageService) { }

  ngOnInit() {
    this.userName = this._storageService.getUserName();
  }

  logout() {
    this._auth.logout();
  }
}
