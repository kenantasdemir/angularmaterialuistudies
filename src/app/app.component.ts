import { Component,OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MydialogComponent } from './mydialog/mydialog.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from "@angular/material/sort"
import {MatPaginator} from "@angular/material/paginator"


export interface Backend{
  name:string
}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angularmaterialstudies';


  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  @ViewChild(MatSort) sort!:MatSort
  @ViewChild(MatPaginator) paginator!:MatPaginator

  messages:number = 5

  opened:boolean = false

  toggle(){
    this.opened = !this.opened
  }

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];


  typesOfShoes:string[]=["Boots","Clogs","Loafers","Moccasins","Sneakers"]


  constructor(private ref:ChangeDetectorRef,private snackbar:MatSnackBar,private dialog:MatDialog){}
  
  
  ngAfterViewInit(): void {
    // Bileşenin görünümü tamamlandığında bu yöntem tetiklenir.
    // DOM manipülasyonları veya diğer işlemler burada gerçekleştirilebilir.
      this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator


  }

  ngAfterContentChecked(){
    this.ref.detectChanges()
  }

  logChange(index:number | null){
    console.log(index)
  }


  selectedValue!:string


  options:string[] = ["Angular","React","Vue"]


  objectOptions = [
      {name:"C#"},
      {name:"Python"},
      {name:"NodeJS"}
  ]

  showIt(subject:Backend):string{
      return subject ? subject.name : ""
  }


  minDate = new Date()
  maxDate = new Date("May 20,2022")


  dateFilter = (date:any)=>{
    const day = date.getDay()
    return day != 0
  }

  openSnackBar(message:string,action:string){
    // this.snackbar.open(message,action,{duration:2000})

    let ref = this.snackbar.open(message,action,{duration:2000})
    ref.afterDismissed().subscribe(()=>{
      console.log("Kenan Taşdemir")
    })

    ref.onAction().subscribe(()=>{
      console.log("Kenan Taşdemir")
    })
  }


  openDialog(){
    // this.dialog.open(MydialogComponent,{data:{name:'Can Boz'}})

    let ref = this.dialog.open(MydialogComponent,{data:{name:'Can Boz'}})
    ref.afterClosed().subscribe(()=>{
      console.log("Kenan Taşdemir")
    })

  }


  showData(row:PeriodicElement){
    console.log(row)
  }

  applyFilter(event:any){
    console.log("Girilen değer: ", event)
    this.dataSource.filter = event.target.value.trim().toLowerCase()



  }
}
