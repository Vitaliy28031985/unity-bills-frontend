import { Component } from '@angular/core';
import { CostListService } from '../../services/cost-list.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { CostList } from '../../interfaces/costs.list';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../services/notifications.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { translateBackendError } from '../../common/error-messages';




@Component({
  selector: 'app-costs-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizeFirstPipe, DeleteModalComponent],
  templateUrl: './costs-list.component.html',
  styleUrl: './costs-list.component.css'
})
export class CostsListComponent {
  costLists: any[] = [];
  idToDelete: string | null = null;
  titleToDelete: string | null = null;
  isDeleteModalVisible = false;

  constructor(private costListService: CostListService, private notify: NotificationService) {}

  ngOnInit(): void {
    this.loadCostLists();
    
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


  loadCostLists() {
    this.costListService.getCostLists().subscribe({
      next: (data) => {
       const newData = data.map((item: CostList) => {
        return {
        ...item,
        isDelete: false
       };
      });
        this.costLists = newData;
      },
      error: (err) => {
        console.error('Error loading cost lists', err);
      }
    });
    
  }

 async createCostList() {
      try {
        const createdCostsList = await firstValueFrom(this.costListService.createCostList());
        this.costLists.push({ ...createdCostsList, isDelete: false });
        if (createdCostsList.message) {
             this.notify.show(
             'Помилка',
              translateBackendError(createdCostsList.message),
              'error'
            );
          return; 
        }
          this.notify.show(
          'Успіх',
          'Ви успішно додали список витрат!',
          'success'
          );
      } catch (err: any) {
    
    this.notify.show(
      'Помилка',
      translateBackendError(err?.error?.message) || 'Помилка сервера',
      'error'
    );
  }
}

    checkIsDelete(id: string) {
    for (let i = 0; i < this.costLists.length; i++) {
      if (this.costLists[i]._id === id) {
        this.costLists[i].isDelete = !this.costLists[i].isDelete;
      }
    }
    
  }

    async confirmDelete(id: string) {
    try {
      const data = await firstValueFrom(this.costListService.deleteCostList(id));
      if (data.message) {
        this.notify.show('Помилка', translateBackendError(data.message), 'error');
        return;
      }
      this.costLists = this.costLists.filter(item => item._id !== id);
      this.notify.show('Успіх', 'Ви успішно видалили список витрат!', 'success');
    } catch (err: any) {
      this.notify.show('Помилка', translateBackendError(err?.error?.message) || 'Помилка сервера', 'error');
    } finally {
      this.closeDeleteModal();
    }
  }
}




