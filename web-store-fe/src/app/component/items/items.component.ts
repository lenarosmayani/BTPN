import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../service/items.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Item } from '../../models/item.model';
import { ItemDetailsDialogComponent } from '../item-details-dialog/item-details-dialog.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { UpdateItemDialogComponent } from '../update-item/update-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [ItemsService]
})
export class ItemsComponent implements AfterViewInit, OnInit {
  items: Item[] = [];
  displayedColumns: string[] = ['number', 'itemID', 'itemName', 'itemStock', 'price', 'action'];
  dataSource = new MatTableDataSource<Item>(this.items);
  searchQuery: string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private itemsService: ItemsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadItems(): void {
    this.itemsService.getItems().subscribe(
      data => {
        console.log(data); // Log data untuk debugging
        if (Array.isArray(data)) {
          this.items = data;
          this.dataSource.data = this.items;
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      error => console.error('Error loading items:', error)
    );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  viewItemDetails(item: Item): void {
    this.dialog.open(ItemDetailsDialogComponent, {
      width: '400px',
      data: item,
    });
  }

  deleteItem(id: number): void {
    this.itemsService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
      this.loadItems();
    });
  }  

  openUpdateDialog(itemId: number): void {
    this.itemsService.getItemById(itemId).subscribe(itemData => {
      const dialogRef = this.dialog.open(UpdateItemDialogComponent, {
        data: { 
          itemId, 
          initialData: itemData 
        },
        width: '700px'
      });
  
      dialogRef.afterClosed().subscribe(() => {
        console.log('Dialog closed');
        this.loadItems();
      });
    });
  }  
}
