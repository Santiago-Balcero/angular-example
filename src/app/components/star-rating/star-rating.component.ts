import { Component, Input, Output, OnInit } from '@angular/core';
import { iconConstants } from '@constants/icons.constants';
import { StarRatingService } from '@services/star-rating.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input () scope = '';
  
  effectiveness = 0;
  stars: string = '';
  starEmpty: string = '';
  starHalf: string = '';
  starFull: string = '';

  constructor(
    private starService: StarRatingService
  ) { }

  ngOnInit(): void {
    this.starEmpty = iconConstants.STAR_EMPTY;
    this.starHalf = iconConstants.STAR_HALF;
    this.starFull = iconConstants.STAR_FULL;
    this.starService.getStars().subscribe(
      data => {
        console.log('Data received to stars rating:', data);
        this.effectiveness = data;
        this.ratingStars();
      }
    );
  }

  private ratingStars(): void {
    if (this.effectiveness <= 0) {
      this.stars = '0.0';
    }
    else if (this.effectiveness <= 0.1) {
      this.stars = '0.5';
    }
    else if (this.effectiveness <= 0.2) {
      this.stars = '1.0';
    }
    else if (this.effectiveness <= 0.3) {
      this.stars = '1.5';
    }
    else if (this.effectiveness <= 0.4) {
      this.stars = '2.0';
    }
    else if (this.effectiveness <= 0.5) {
      this.stars = '2.5';
    }
    else if (this.effectiveness <= 0.6) {
      this.stars = '3.0';
    }
    else if (this.effectiveness <= 0.7) {
      this.stars = '3.5';
    }
    else if (this.effectiveness <= 0.8) {
      this.stars = '4.0';
    }
    else if (this.effectiveness <= 0.9) {
      this.stars = '4.5';
    }
    else if (this.effectiveness <= 1) {
      this.stars = '5.0';
    }
  }

}
