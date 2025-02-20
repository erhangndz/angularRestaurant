import { Component } from '@angular/core';
import { MenuService } from '../../_services/menu.service';
import { MenuModel } from '../../_models/menu';
import Swal from 'sweetalert2';
import { CategoryService } from '../../_services/category.service';
import { CategoryModel } from '../../_models/category';

@Component({
  selector: 'app-admin-menu',
  standalone: false,
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {
  menuList : MenuModel[];
  menu: MenuModel= new MenuModel();
  editMenu: any= {};
  categoryList : CategoryModel[];

constructor(private menuService: MenuService,
            private categoryService: CategoryService
){
this.getAll();
this.getCategories();
}

getAll(){
this.menuService.getAll().subscribe({
  next: values=> this.menuList=values,
  error:err=> console.log(err)
})
}

getCategories(){
this.categoryService.getCategories().subscribe({
  next: values => this.categoryList=values,
  error:err=> console.log(err)
})
}



delete(id){
  Swal.fire({
    title: "Silmek istediğinize emin misiniz?",
    text: "Bu işlemi geri alamazsınız!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Evet, Sil!",
    cancelButtonText: 'İptal'
  }).then((result) => {
    if (result.isConfirmed) {
      this.menuService.delete(id).subscribe({
        error:err=> console.log(err),
        complete: () =>  {
          Swal.fire({
          title: "Silme işlemi başarılı!",
          text: id+ "numaralı Id'ye Sahip Ürün Silindi",
          icon: "success"
        }).then(()=> this.getAll());


      }

      })


    }
  });


}

onSelected(model){
this.editMenu=model;
}

update(){
  this.menuService.update(this.editMenu.id,this.editMenu).subscribe({
    error:err=> console.log(err),
    complete: () =>  Swal.fire({
      title: "Güncelleme işlemi başarılı!",
      text:"Ürün Başarıyla Güncellendi",
      icon: "success"
    }).then(()=> this.getAll())
  })
}

create(){
  this.menuService.create(this.menu).subscribe({
next : value => this.getAll(),
error: err=> console.log(err),
complete: () =>  Swal.fire({
  title: "Ürün ekleme başarılı!",
  text:"Ürün Başarıyla Kaydedildi",
  icon: "success"
})
  })
}




}
