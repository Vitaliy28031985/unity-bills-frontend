import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { CreatePriceComponent } from '../create-price/create-price.component';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../services/notifications.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { translateBackendError } from '../../common/error-messages';

export interface Price {
  _id: string;
  title: string;
  price: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  isShow?: boolean;
  isDelete?: boolean;
}


@Component({
  selector: 'app-prices-list',
  standalone: true,
  imports: [CreatePriceComponent, CommonModule, FormsModule, DeleteModalComponent],
  templateUrl: './prices-list.component.html',
  styleUrl: './prices-list.component.css'
})
export class PricesListComponent {
  pricesLists: any[] = [];
  idToDelete: string | null = null;
  titleToDelete: string | null = null;
  isDeleteModalVisible = false;
  protected isShowAdd = false;
  
  constructor(private priceService: PriceService, private notify: NotificationService) { }

   ngOnInit(): void {
    this.loadPriceLists();
  }

  openDeleteModal(id: string,  title: string) {
    this.idToDelete = id;
    this.isDeleteModalVisible = true;
    this.titleToDelete = title;
  }

  closeDeleteModal() {
    this.isDeleteModalVisible = false;
    this.idToDelete = null;
  }

toggle() {
  this.isShowAdd = !this.isShowAdd;
  }
  
checkIsShow(id: string) {
    for (let i = 0; i < this.pricesLists.length; i++) {
      if (this.pricesLists[i]._id === id) {
        this.pricesLists[i].isShow = !this.pricesLists[i].isShow;
      }
    }
        
  }

  loadPriceLists() { 
    this.priceService.getPrices().subscribe({
      next: (data) => {
          const newData = data.map((item: Price[]) => {
                return {
                  ...item,
                isShow: false,
                isDelete: false
               };
              });
        this.pricesLists = newData;
       },
       error: (err) => {
        console.error('Error loading cost lists', err);
      }
    })
  }

  

  async createPrice(data: { title: string;  price: number}) {
  try {
    const createdPrice = await firstValueFrom(this.priceService.createPrice(data));
    this.pricesLists.push({
      ...createdPrice,
      isShow: false,
      isDelete: false
    });
    this.toggle();
      this.notify.show(
      'Успіх',
      'Ви успішно додали ціну!',
      'success'
    );
  } catch (err) {
    console.error('Помилка при створенні ціни', err);
  }
  }

  updatePrice(price: Price) {
    if (!price.isShow) {
     this.checkIsShow(price._id); 
    } else {
        const payload = {
    title: price.title,
    price: price.price,
  };
  this.priceService.updatePrice(price._id, payload).subscribe({
    next: (updatedPrice) => {
          price.isShow = false;
          Object.assign(price, updatedPrice);
             this.notify.show(
      'Успіх',
      'Ви успішно обновили ціну!',
      'success'
    );
    },
    error: (err) => {
      console.error('Update failed', err);
    },
  });   
    } 
  }
  
  async deletePrice(id: string) {
  try {
    
   const data = await firstValueFrom(this.priceService.deletePrice(id));

     if (data.message) {
        this.notify.show('Помилка', translateBackendError(data.message), 'error');
        return;
      }
    
    this.pricesLists = this.pricesLists.filter(price => price._id !== id);

       this.notify.show(
      'Успіх',
      'Ви успішно видалили ціну!',
      'success'
    );
  } catch (err: any) {
      this.notify.show('Помилка', translateBackendError(err?.error?.message) || 'Помилка сервера', 'error');
    } finally {
      this.closeDeleteModal();
    }
}
}
