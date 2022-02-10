import {  Component } from '@angular/core';
import {QuestionsheetService} from './questionsheet.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ChartType, Row } from "angular-google-charts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'lifofassignment';
  questionlist : any
  selectedanswer : any[]=[]
  data_json : any
 constructor(private service : QuestionsheetService) 
 {
 
   this.getquestionlist()
 }

 assignment = new FormGroup({
  selctedanswer: new FormControl('', Validators.required)
});
 
selctedanswer : any

get f(){
  return this.assignment.controls;
}

chartData = {
  type: ChartType.Bar,
  data: [
    ['Correct Answer', 0],
    ['Incorrect Answer', 0],
],

chartColumns: ['', ''],
width: 1000,
height: 400
};
 




 getquestionlist()
 {
   this.service.getdata().subscribe(res=>{
    
    this.questionlist=JSON.parse(res)
 
    localStorage.setItem("questions",JSON.stringify(this.questionlist))

 })        
}
getvalue(event : any)
{
  console.log(event.target.value)
  this.selctedanswer=event.target.value
  console.log(this.selctedanswer)
}
submitted : boolean =false
submit()
{
  
  if(this.selectedanswer.length>0)
  {
  if(this.questionlist.length==this.selectedanswer.length)
  {
   let data=  this.questionlist.filter((x: any)=>x.correct_anser!=x.selectedanser)
   let coorectanswerdata=  (this.questionlist.length-data.length)
  

   console.log(data)
   this.submitted=true
   this.chartData = {
    type: ChartType.Bar,
    data: [
      ['Correct Answer', coorectanswerdata],
      ['Incorrect Answer', data.length],
  ],

  chartColumns: ['', ''],
  width: 1000,
  height: 400,
  
  };
  }
  else
  {
  
   let data= this.questionlist.filter((question : any)=>question.selectedanser=='')
    
   console.log("not answered",data)


   if(data.length>0)
   {
    alert(`Please Select the answers of ${data.length} questions before submitting`)
     data.map((x: any)=>{
       x.selectedanser='null'
     })
   }
   else
   {
    alert(`Please Select the answers of ${this.questionlist.length-this.selectedanswer.length} questions before submitting`)
  
   }

   this.submitted=false
    
  }
}
else{
  alert(`Please Select the answers of ${this.questionlist.length.length} questions before submitting`)
 
  this.questionlist.map((question : any)=>{
    question.selectedanser="null"
  }
 
  )
  this.submitted=false
}
}
questionid : any
selectanswer(event : any,questionid : any)
{
  let data= this.questionlist.filter((x: any)=>x.question_id==questionid) 
  if(event.target.value!='')
  {
    let selectedanswer={}

  if(data[0].correct_anser==event.target.value)
  {
    data[0].selectedanser=event.target.value
    selectedanswer={
      "questionid" : questionid,
      "correctanswer" : event.target.value,
      
    }
  }
  else{
    data[0].selectedanser=event.target.value
    selectedanswer={
      "questionid" : questionid,
      "incorrectanswer" : event.target.value
    }
  }
  this.selectedanswer.push(selectedanswer)
 
}
else{
  data[0].selectedanser="null"
  let index = this.selectedanswer.findIndex( question => question.questionid==questionid);
  if(index!=-1)
  this.selectedanswer.splice(index,1)
  this.questionid=questionid
}
}

clearform()
{
  this.submitted=false
  this.assignment.reset();

  this.questionlist=localStorage.getItem('questions')
  this.questionlist=JSON.parse(this.questionlist)
  console.log(this.questionlist)
 this.selectedanswer=[]
  
}

 }

