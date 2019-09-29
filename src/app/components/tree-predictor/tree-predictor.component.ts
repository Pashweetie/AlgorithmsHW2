import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { throwError } from 'rxjs';
// import { platform } from 'os';
// import { isWorker } from 'cluster';

interface TreeNode{
  val: string;
  isWord: boolean;
  children: TreeNode[];
}
@Component({
  selector: 'app-tree-predictor',
  templateUrl: './tree-predictor.component.html',
  styleUrls: ['./tree-predictor.component.scss']
})
export class TreePredictorComponent implements OnInit {
  root= {
    val:null,
    children: new Array(26),
    isWord: null,
  }
  wordArray;
  indexVal =0;
  constructor( private http:HttpClient) {
   }

  ngOnInit() {
    if('a'<'A'){
      console.log('a is less than A');
    }else{
      console.log('nah, it aint');
    }
    // this.root.val = 'a';
    // for (let index = 0; index <26; index++) {
    //   this.root.children.push(null);      
    // }
    // this.root.isWord = true;
    this.http.get('assets/words.txt',{responseType:'text'}).subscribe(data =>{
      this.wordArray = data.split('\n');
      console.log(this.wordArray);
      let val = 0;
      this.wordArray.forEach(element => {
        console.log('iteration: ',val,' root ', this.root);
        this.root = this.addToTree(element.toLowerCase(),this.root,this.root);
        val++;
      });
    });
    let val = 'banana';
    // let arr = val.split('');
    // console.log(val.charCodeAt);
    // console.log(this.searchWord('banana',this.root));
  }
  searchWord(val: string, node:TreeNode) :boolean{
    // let arr = val.split('');
    if(val.charCodeAt(0)<=123&&val.charCodeAt(0)>=97){      
      let nextChild =val.charCodeAt(0)%26;
      if(!node.children[nextChild]){
        return false;
      }else{
        if(val.length === 1){
          return true;
        }else{
          this.searchWord(val.substr(1),node.children[nextChild]);
        }
      }
      // if(arr.length === 1){             
      //   if(node.children[nextChild]){
      //     this.searchWord(val.substr(1),node.children[nextChild]);
      //   }else{
      //     return false;
      //   }
      // }else{
      //   if(node.children[nextChild]){
      //     this.searchWord(val.substr(1),node.children[nextChild]);
      //   }else{
      //     node.children[nextChild].val = arr[0];
      //   }
      // }
    }else{
      console.error('value not supported in prediction software');
      return false;
      
    }
  }
  addToTree(val: string, node: TreeNode, root){
    // node.children = new Array(26);
    // console.log('root',root);
         
    let arr = val.split('');         
    let nextChild =val.charCodeAt(0)%26;
    node.children[nextChild] = {
      val: null,
      isWord: null,
      children: new Array(26),
    }    
    // node.children = new Array(26);
    if((val.charCodeAt(0)<=123&&val.charCodeAt(0)>=97)){
      if(node.val === null){
        
        node.val = arr[0];
        node.children = new Array(26);
        node.isWord = true;
        console.log('created new node ', node);
        return root;
      }else if(val.length === 1){
        console.log('repeated word');
        return root;
      }else{                
        
        this.addToTree(val.substr(1),node.children[nextChild],root);        
      }
      console.log('val ',val);       
      console.log('children ',node.children);       
      console.log('this val ',node.val);  
    }else{
      console.error('value not supported in prediction software',val.charCodeAt(0));
      
    }
  }

}
