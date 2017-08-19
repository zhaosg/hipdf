import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer";
import {File} from '@ionic-native/file';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              public file: File,
              public loadingCtrl: LoadingController,
              private transfer: FileTransfer,
              private document: DocumentViewer) {

  }

  fileurl;

  openPDF() {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    };
    // this.document.viewDocument(this.file.applicationDirectory+'www/assets/3.pdf', 'application/pdf', options)
    this.document.viewDocument(this.fileurl, 'application/pdf', options)
  }


  download() {
    if (!this.fileurl) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = 'http://dl.fullcirclemagazine.org/issue65_en.pdf';
      let loading = this.loadingCtrl.create({
        content: "正在加载文档..."
      });
      fileTransfer.onProgress((event: ProgressEvent) => {
        if (event.lengthComputable) {
          loading.data.content = ((event.loaded / event.total * 100).toString());
        }
      });
      loading.present();
      fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
        // alert('download complete: ' + entry.toURL());
        const options: DocumentViewerOptions = {
          title: 'My PDF'
        };
        loading.dismiss();
        this.fileurl = entry.toURL();
        this.openPDF();
      }, (error) => {
        // handle error
      });
    } else {
      this.openPDF();
    }

  }
}
