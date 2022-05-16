import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { OffersService } from 'src/app/services/offers.service';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

offerForm !: FormGroup;

  offers : Offer[] = [] ;

  subscription!: Subscription;

  currentOfferPhotoFile!: any;

  currentOfferPhotoURL !: string;

  constructor(
    private formBuilder: FormBuilder,
    private offersService: OffersService,
  ) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initOfferForm();
    this.subscription = this.offersService.offersSubject.subscribe({
      next : (offers: Offer[]) => { this.offers = offers; console.log('Next');
      },
      error: (error)=> {console.log(error);
      }
    });
    this.offersService.getOffers();
  }

  initOfferForm(): void{
    this.offerForm = this.formBuilder.group({
      id: [null],
      title:['', [Validators.required , Validators.maxLength(100) ]],
      photo: [],
      brand:'',
      model:'',
      description:'',
      price:0
    });
  }

  onSubmitOfferForm(): void {
    const offerId = this.offerForm.value.id;
    let offer = this.offerForm.value;
    const offerPhotoUrl = this.offers.find(el => el.id === offerId)?.photo;
    offer = {...offer, photo: offerPhotoUrl};

    if (!offerId || offerId && offerId ===''){ // Création
      delete offer.id;
      this.offersService.createOffer(offer, this.currentOfferPhotoFile).catch(console.error);
    }else{ //MODIFICATION
      delete offer.id;
      this.offersService.editOffer(offer, offerId, this.currentOfferPhotoFile).catch(console.error);
    }
    this.offerForm.reset();
    this.currentOfferPhotoFile = null;
    this.currentOfferPhotoURL = '';
  }

  onChangeOfferPhoto($event: any): void {
    this.currentOfferPhotoFile = $event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.currentOfferPhotoFile);
    fileReader.onload = (e) =>{
      this.currentOfferPhotoURL = <string>e.target?.result;
    }
  }

  onEditOffer(offer : Offer): void {
    this.currentOfferPhotoURL = offer.photo ? offer.photo : '';
    this.offerForm.setValue({
      id : offer.id ? offer.id : '',
      title: offer.title ? offer.title : '',
      photo: '',
      brand: offer.brand ? offer.brand : '',
      model: offer.model ? offer.model : '',
      description: offer.description ? offer.description : '',
      price: offer.price ? offer.price : 0
    });
  }

  onDeleteOffer(offerId? : string): void {
    if(offerId){
      this.offersService.deleteOffer(offerId).catch(console.error);
    }else{
      console.error('An id must be provided');
    }

  }


}
