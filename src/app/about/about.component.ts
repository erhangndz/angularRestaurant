import { Component } from '@angular/core';
import { About } from '../_models/about';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {


about: About = {id:1,title:'Başlık',description:'Açıklama'}
about2: About = {id:2,title:'Başlık 2',description:'Açıklama 2'}
about3: About = {id:3,title:'Başlık 3',description:'Açıklama 3'}
about4: About = {id:4,title:'Başlık 4',description:'Açıklama 4'}


abouts:About[]= [this.about,this.about2,this.about3,this.about4]

}
