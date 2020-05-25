import { PipeTransform, Pipe } from "@angular/core";
import { Comic } from './model/comic';

@Pipe(
  { name: 'comic_searchFilter' }
)


export class Comic_searchFilter implements PipeTransform {
  transform(comic_search: Comic[], searchTerm:string){
    if(!comic_search || searchTerm){
      return comic_search;
    }
    return comic_search.filter(
      cs => cs.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}