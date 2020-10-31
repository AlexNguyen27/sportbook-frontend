import React from "react";

const FiveStars = () => {
  return (
    <div id="half-stars-example">
      <div class="rating-group">
        <input
          class="rating__input rating__input--none"
          checked
          name="rating2"
          id="rating2-0"
          value="0"
          type="radio"
        />
        <label aria-label="0 stars" class="rating__label" for="rating2-0">
          &nbsp;
        </label>
        <label
          aria-label="0.5 stars"
          class="rating__label rating__label--half"
          for="rating2-05"
        >
          <i class="rating__icon rating__icon--star fa fa-star-half"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-05"
          value="0.5"
          type="radio"
        />
        <label aria-label="1 star" class="rating__label" for="rating2-10">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-10"
          value="1"
          type="radio"
        />
        <label
          aria-label="1.5 stars"
          class="rating__label rating__label--half"
          for="rating2-15"
        >
          <i class="rating__icon rating__icon--star fa fa-star-half"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-15"
          value="1.5"
          type="radio"
        />
        <label aria-label="2 stars" class="rating__label" for="rating2-20">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-20"
          value="2"
          type="radio"
        />
        <label
          aria-label="2.5 stars"
          class="rating__label rating__label--half"
          for="rating2-25"
        >
          <i class="rating__icon rating__icon--star fa fa-star-half"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-25"
          value="2.5"
          type="radio"
          checked
        />
        <label aria-label="3 stars" class="rating__label" for="rating2-30">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-30"
          value="3"
          type="radio"
        />
        <label
          aria-label="3.5 stars"
          class="rating__label rating__label--half"
          for="rating2-35"
        >
          <i class="rating__icon rating__icon--star fa fa-star-half"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-35"
          value="3.5"
          type="radio"
        />
        <label aria-label="4 stars" class="rating__label" for="rating2-40">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-40"
          value="4"
          type="radio"
        />
        <label
          aria-label="4.5 stars"
          class="rating__label rating__label--half"
          for="rating2-45"
        >
          <i class="rating__icon rating__icon--star fa fa-star-half"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-45"
          value="4.5"
          type="radio"
        />
        <label aria-label="5 stars" class="rating__label" for="rating2-50">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input
          class="rating__input"
          name="rating2"
          id="rating2-50"
          value="5"
          type="radio"
        />
      </div>
      <p
        class="desc"
        style="margin-bottom: 2rem; font-family: sans-serif; font-size:0.9rem"
      >
        Half stars
        <br />
        Space on left side to select 0 stars
      </p>
    </div>
  );
};

export default FiveStars;
