//@Packages
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';

//@Services
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public DEFAULT_PAGE_SIZE: number = 10;
  
  constructor(private toastr: ToastrService) { }

  isNullOrEmpty(item) {
    if (item == null || item == '' || item == undefined) {
      return true;
    } else {
      return false;
    }

  }

  isNumeric(item) {
    if (!this.isNullOrEmpty(item)) {
      return !isNaN(item);
    }
    return false;
  }

  convertToNumber(value): number {
    if (!this.isNullOrEmpty(value)) {
      return Number(value);
    } else {
      return Number(0);
    }
  }

  parseString(value): string {
    if (!this.isNullOrEmpty(value)) {
      return value.toString();
    } else {
      return "";
    }
  }

  parseBoolean(value): boolean {
    if (!this.isNullOrEmpty(value) && (value == 1 || value == "1" || value == "true")) {
      return true;
    } else {
      return false
    }
  }

  startsWith(text, prefixText): boolean {
    if (!this.isNullOrEmpty(text)) {
      if (text.startsWith(prefixText)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  endsWith(text, postfixText): boolean {
    if (!this.isNullOrEmpty(text)) {
      if (text.endsWith(postfixText)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onlyNumeric(event) {
    //46    -   Period(.)            
    if ((event.which != 46 || event.key.indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
      //event.preventDefault();
      return true;
    }
  }

  isNumericKey(event) {

    var charCode = (event.which) ? event.which : event.keyCode
    var value = event.key;
    var dotcontains = value.indexOf(".") != -1;
    var minuscontains = value.indexOf("-") != -1;
    if (dotcontains) {
      if (charCode == 46) return true;
      else return false;
    }

    if (minuscontains) {
      if (charCode == 45) return true;
      else return false;
    }

    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  formatNumberWithDecimal(number, decimalPlaces) {
    if (number != null && number != '' && number != undefined) {
      return Number(number).toFixed(decimalPlaces);
    }
    return "0.00";
  }

  Lower(item) {
    if (!this.isNullOrEmpty(item)) {
      return item.toLowerCase();
    }
    return "";
  }

  Upper(item) {
    if (!this.isNullOrEmpty(item)) {
      return item.toUpperCase();
    }
    return "";
  }

  showLoader() {
    $('#divLoader').show();
  }

  hideLoader() {
    $('#divLoader').hide();
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  showToaster(message: string, toastrType: string) {
    switch (toastrType) {
      case "success":
        setTimeout(() => this.toastr.success(message, "Success!"));
        break;
      case "error":
        setTimeout(() => this.toastr.error(message, "Error!"));
        break;
      case "warning":
        setTimeout(() => this.toastr.warning(message, "Warning!"));
        break;
      case "info":
        setTimeout(() => this.toastr.info(message, "Info!"));
        break;
    }
  }

  parseDate(date: string) {
    return moment(date).format("L")
  }
}