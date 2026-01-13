import { Component } from '@angular/core';
import { FixedCostsService } from '../../services/fixed-costs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CreateFixedCostsComponent } from '../create-fixed-costs/create-fixed-costs.component';
import { NotificationService } from '../../services/notifications.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { translateBackendError } from '../../common/error-messages';

export interface FixedCost {
  _id: string;
  title: string;
  sum: number;
  owner: string;
  createdAt: string; 
  updatedAt: string;  
    isShow?: boolean;
  isDelete?: boolean;
}


@Component({
  selector: 'app-costs-fixed',
  standalone: true,
  imports: [CreateFixedCostsComponent, CommonModule, FormsModule, DeleteModalComponent],
  templateUrl: './costs-fixed.component.html',
  styleUrl: './fixed-costs.component.css'
})
export class CostsFixedComponent {
  constructor(private fixedCostsService: FixedCostsService,  private notify: NotificationService) { }
  fixesCostsList: any = [];
   idToDelete: string | null = null;
  titleToDelete: string | null = null;
  isDeleteModalVisible = false;
   protected isShowAdd = false;

  ngOnInit(): void {
    this.loadFixedCostsLists();
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
    for (let i = 0; i < this.fixesCostsList.length; i++) {
      if (this.fixesCostsList[i]._id === id) {
        this.fixesCostsList[i].isShow = !this.fixesCostsList[i].isShow;
      }
    }
        
  }
  
  loadFixedCostsLists() { 
      this.fixedCostsService.getFixedCosts().subscribe({
        next: (data) => {
            const newData = data.map((item: FixedCost[]) => {
                  return {
                    ...item,
                  isShow: false,
                  isDelete: false
                 };
                });
          this.fixesCostsList = newData;
                   },
         error: (err) => {
          console.error('Error loading cost lists', err);
        }
      })
  }

   async createFixedList(data: { title: string;  sum: number}) {
    try {
      const createdPrice = await firstValueFrom(this.fixedCostsService.createFixedCost(data));
      this.fixesCostsList.push({
        ...createdPrice,
        isShow: false,
        isDelete: false
      });
      this.toggle();
      this.notify.show(
      'Успіх',
      'Ви успішно додали витрату!',
      'success'
    );
    } catch (err) {
      console.error('Помилка при створенні ціни', err);
    }
    }
  
   updateFixedList(cost: FixedCost) {
      if (!cost.isShow) {
       this.checkIsShow(cost._id); 
      } else {
          const payload = {
      title: cost.title,
      sum: cost.sum,
    };
        this.fixedCostsService.updateFixedCost(cost._id, payload).subscribe({
      next: (updatedPrice) => {
            cost.isShow = false;
            Object.assign(cost, updatedPrice);
                this.notify.show(
                  'Успіх',
                  'Ви успішно оновили витрату!',
                   'success'
                );
      },
      error: (err) => {
        console.error('Update failed', err);
      },
    });   
      } 
    }
  
    async deleteCostsList(id: string) {
      try {
    
      const data =  await firstValueFrom(this.fixedCostsService.deleteFixedCost(id));
          if (data.message) {
        this.notify.show('Помилка', translateBackendError(data.message), 'error');
        return;
      }
        
        this.fixesCostsList = this.fixesCostsList.filter((cost: FixedCost) => cost._id !== id);
        this.notify.show(
          'Успіх',
          `Витрата успішно видалена`,
          'success'
        );
      }
      catch (err: any) {
      this.notify.show('Помилка', translateBackendError(err?.error?.message) || 'Помилка сервера', 'error');
    } finally {
      this.closeDeleteModal();
    }
}
}
