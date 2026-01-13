import { Component, Input } from '@angular/core';
import { CreateCostsComponent } from '../create-costs/create-costs.component';
import { CommonModule } from '@angular/common';
import { CostItem, CostList } from '../../interfaces/costs.list';
import { HttpErrorResponse } from '@angular/common/http';
import { CostListService } from '../../services/cost-list.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AllowMenuComponent } from '../allow-menu/allow-menu.component';
import { NotificationService } from '../../services/notifications.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { translateBackendError } from '../../common/error-messages';

@Component({
  selector: 'app-tablet-costs',
  standalone: true,
  imports: [CreateCostsComponent, AllowMenuComponent, CommonModule, FormsModule, CapitalizeFirstPipe, DeleteModalComponent],
  templateUrl: './tablet-costs.component.html',
  styleUrl: './tablet-costs.component.css'
})
export class TabletCostsComponent {
  @Input() listId!: string | null;
  protected isShowAdd = false;
  protected isShowAllow = false;

  idToDelete: string | null = null;
  idCostDelete: string | null = null;
  titleToDelete: string | null = null;
  isDeleteModalVisible = false;

  costsListTitle: string = ''
  costsListSum: number = 0
  costs: CostItem[] = []

 
  constructor(
    private costListService: CostListService,
    private notify: NotificationService
) {}

  ngOnInit() {
     if (this.listId) {
    this.loadCostLists();
  }
    console.log('List ID:', this.listId);
  }

private sortCostsByNumber() {
  this.costs = [...this.costs].sort((a, b) =>
    Number(b.number != null) - Number(a.number != null)
  );
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

  toggleAllow() {
    this.isShowAllow = !this.isShowAllow;
    if (this.isShowAdd) {
     this.toggle() 
    }
    
  }

  checkIsShow(id: string) {
    for (let i = 0; i < this.costs.length; i++) {
      if (this.costs[i].id === id) {
        this.costs[i].isShow = !this.costs[i].isShow;
      }
    }
        
  }
  
  loadCostLists() { 

  if (!this.listId) {
    console.error('listId is null');
    return;
  }

  this.costListService.getCostListById(this.listId).subscribe({
  next: (data: CostList) => {
     
      const costs = data.costs.map((item: CostItem) => {
        return {
          ...item,
          isShow: false,
          isDelete: false
        }
      })

      this.costsListTitle = data.title;
      this.costsListSum = data.sum;
      this.costs = costs;
      this.sortCostsByNumber();
  },
   error: (err: HttpErrorResponse) => {
    console.error(err.message);
  }
});

  }

  async createCost(data: { title: string; number: number; price: number }) {
  try {
    const createdCostList = await firstValueFrom(
      this.costListService.addCost(this.listId ?? '', data)
    );

    
    if (createdCostList.message) {
      this.notify.show(
        'Помилка',
       translateBackendError(createdCostList.message),
        'error'
      );
      return; 
    }

    const cost = createdCostList.costs;

    this.costs.push({
      ...cost[cost.length - 1],
      isShow: false,
      isDelete: false
    });

    this.sortCostsByNumber();

    this.costsListSum = createdCostList.sum;
    this.toggle();

    this.notify.show(
      'Успіх',
      'Ви успішно оновили витрату!',
      'success'
    );

  } catch (err: any) {
    this.toggle();

    this.notify.show(
      'Помилка',
      translateBackendError(err?.error?.message) || 'Помилка сервера',
      'error'
    );
  }
}


 updateCostList(cost: CostItem) { 
  if (!cost.isShow) {
    this.checkIsShow(cost.id);
    return;
  }

  const payload = {
    title: cost.title,
    number: cost.number,
    price: cost.price,
  };
 
  if (!this.listId) return;

  this.costListService.updateCost(this.listId, cost.id, payload).subscribe({
    next: (updatedCost) => {

      if ((updatedCost as any).message) {
        this.notify.show(
          'Помилка',
          translateBackendError((updatedCost as any).message),
          'error'
        );
        return; 
      }

      cost.isShow = false;

    
      const currentCost = updatedCost.costs.filter(
        (item: CostItem) => item.id === cost.id
      );

      Object.assign(cost, currentCost[0]);
      this.costsListSum = updatedCost.sum;

      
      this.notify.show(
        'Успіх',
        'Ви успішно оновили витрату!',
        'success'
      );
    },
    error: (err) => {
      console.error('Update failed', err);

      this.notify.show(
        'Помилка',
        translateBackendError(err?.error?.message) || 'Помилка сервера',
        'error'
      );
    },
  });
}


async deleteCost(id: string) {
  if (!this.listId) return;
  try {
    const data = await firstValueFrom(this.costListService.deleteCost(this.listId, id));
    
     if (data.message) {
        this.notify.show('Помилка', translateBackendError(data.message), 'error');
        return;
    }
   this.costs = this.costs.filter((item) => item.id !== id);
    this.costsListSum = data.sum;
    
    this.notify.show(
      'Успіх',
      `Ви успішно видалили витрату ${this.titleToDelete}!`,
      'success'
    );
    
} catch (err: any) {
      this.notify.show('Помилка', translateBackendError(err?.error?.message) || 'Помилка сервера', 'error');
    } finally {
      this.closeDeleteModal();
    }

  }
  
}
