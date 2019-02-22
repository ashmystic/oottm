$(function() {

  var carousel,
      cells,
      cellWidth,
      cellHeight,
      radius,
      theta;
  var cellCount = 7;
  var selectedIndex = 0;
  var isHorizontal = true;
  var scope = 'Stages';
  var rotateFn = 'rotateY';
  // console.log( cellWidth, cellHeight );
  var startX, startY;
  var deltaX, deltaY;

  var initVars = function() {
    carousel = document.querySelector('.carousel');
    cells = carousel.querySelectorAll('.carousel__cell');
    cellWidth = carousel.offsetWidth;
    cellHeight = carousel.offsetHeight;

    carousel.style.transition = 'transform 1s';
 //   carousel.style.transform = 'transition 1s';
    carousel.style.webkitTransition = '-webkit-transform 1s';
  //  carousel.style.webkitTransform = 'transition 1s';

    changeCarousel();
}

initVars();

$(window).resize(function() {
    initVars();
  });

  function rotateCarousel() {
    var angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
      rotateFn + '(' + angle + 'deg)';
    carousel.style.webkitTransform = 'translateZ(' + -radius + 'px) ' + 
      rotateFn + '(' + angle + 'deg)';
  }

/*
  carousel.addEventListener( 'dragstart', function(event) {
 //   console.log(event.screenX);
    startX = event.screenX;
    startY = event.screenY;
  });
  carousel.addEventListener( 'drag', function(event) {
    deltaX = event.screenX - startX;
    deltaY = event.screenY - startY;
    console.log(deltaX);
    selectedIndex += Math.floor(deltaX / 500);
  //  selectedIndex = (deltaX < 0) ? -selectedIndex : selectedIndex;
    console.log(selectedIndex);
    rotateCarousel();
  });
*/

  var prevButton = document.querySelector('.previous-button');
  prevButton.addEventListener( 'click', function() {
    selectedIndex--;
    rotateCarousel();
  });

  var nextButton = document.querySelector('.next-button');
  nextButton.addEventListener( 'click', function() {
    selectedIndex++;
    rotateCarousel();
  });

  var flipButton = document.querySelector('.flip-button');
  flipButton.addEventListener( 'click', function() {
    flipCarousel();
  });

  var spinButton = document.querySelector('.spin-button');
  spinButton.addEventListener( 'click', function() {
    selectedIndex += Math.floor(Math.random()*cellCount)+1;
    rotateCarousel();
    if(Math.random() >= 0.5)
      flipCarousel();
  });


  function flipCarousel() {
    var cards = document.querySelectorAll('.card');
    for ( var i=0; i < cards.length; i++ ) {
      cards[i].classList.toggle('is-flipped');
    }
    var cardFront = document.querySelectorAll('.card__face--front');
    for ( var i=0; i < cardFront.length; i++ ) {
    //  cardFront[i].style.setAttribute ("display", "none");
    // cardFront[i].style.setProperty ("display", "none", null);
    }
    scope = (scope == 'Stages') ? 'States' : 'Stages';
    var scopeText = document.querySelector('.scope-text');
    scopeText.innerHTML = scope;

  }


  function changeCarousel() {
    theta = 360 / cellCount;
    var cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
    for ( var i=0; i < cells.length; i++ ) {
      var cell = cells[i];
      if ( i < cellCount ) {
        // visible cell
        cell.style.opacity = 1;
        var cellAngle = theta * i;
        cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
        cell.style.webkitTransform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = 'none';
        cell.style.webkitTransform = 'none';
      }
    }

    rotateCarousel();
  }

  // set initials
//  changeCarousel();


  /*
  Buttons
  */
  // var buttonGroup = document.querySelector('.button-group');
  // buttonGroup.addEventListener( 'click', function() {
  //     var cards = document.querySelectorAll('.card');
  //     for ( var i=0; i < cards.length; i++ ) {
  //       cards[i].classList.toggle('is-flipped');
  //     }
  //   });

  // buttonGroup.each(function(i, buttonGroup) {
  //       var $buttonGroup = $(buttonGroup);
  //       buttonGroup.on('click', 'button', function() {
  //           buttonGroup.find('.is-checked').removeClass('is-checked');
  //           $(this).addClass('is-checked');
  //           cards[i].classList.toggle('is-flipped');
  //       });
  //   });

  /*
  Dialog
  */
  // Show dialog when card is clicked
  $('.card__face').click(function(event) {
      var modalId = $(this).attr('modal');
      // Workaround for not being able to differentiate clicks on front vs back
      var modalIdList = [
        {1: "modal-birth", 2: "modal-growth", 3: "modal-relationships", 4: "modal-aging", 5: "modal-loss", 6: "modal-death", 7: "modal-tree"},
        {1: "modal-presence", 2: "modal-gratitude", 3: "modal-synchronicity", 4: "modal-gnosis", 5: "modal-meta-gnosis", 6: "modal-rapture", 7: "modal-spirit"}
      ];
      if(scope == "Stages") {
        showDialog(modalIdList[0][modalId]); 
      } else {
        showDialog(modalIdList[1][modalId]);
      }
    });

  showDialog = function (modalId) {
    if(modalId) {
      modal = document.getElementById(modalId);
      modal.style.display = "block";
      
      var span = modal.getElementsByClassName("close")[0];
      span.onclick = function() {
        modal.style.display = "none";
      }

      $('.dialog-link').click(function(event) {
        event.preventDefault();
        modal.style.display = "none";
        
        var modalId = $(this).attr('modal');
        showDialog(modalId); 
      });

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = window.ontouchstart = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
  }

});