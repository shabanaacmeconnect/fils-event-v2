import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements  OnDestroy{
  id=''; details;tranDetails;

  endSubs$ : Subject<any>= new Subject();
  @ViewChild('contentToConvert', { static: false }) contentToConvert: ElementRef;

  constructor(public route: ActivatedRoute, public authfackService:AuthfakeauthenticationService) {
    this.id =this.route.snapshot.paramMap.get("id")
    this.getDetails()
  }
  getDetails(){
    this.authfackService.get("issued_certificates/details?id="+this.id).pipe(takeUntil(this.endSubs$)).subscribe(res=>{
      if(res['status']){
        this.details=res['data'];
        this.tranDetails = res['transactionData'];
      }
    })
  }
  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete()
}
async downloadPdf() {
  const doc = new jspdf.jsPDF();
  const element = this.contentToConvert.nativeElement;

  if (!element) {
    console.error('Element not found!');
    return;
  }
  window.scrollTo(0, 0);

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const scaleFactor = .20; // Adjust as needed
  console.log(canvas.width)
  const imgWidth = canvas.width * scaleFactor;
  const imgHeight = canvas.height * scaleFactor;
  console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
console.log('PDF dimensions:', imgWidth, 'x', imgHeight);
  doc.addImage(imgData, 'PNG', 25, 5, imgWidth, imgHeight);
  doc.save( 'certificate.pdf');

}
}
