let template=document.createElement('template');
template.innerHTML=`
        <link rel="stylesheet" href="./node_modules/font-awesome/css/font-awesome.min.css" >
        <link rel="stylesheet" href="./starRatingStyle.css">
        <div class="stars-background">
        <div class="fa-stars"></div>
        </div>
`
class StarRating extends HTMLElement{
     constructor(){
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        let rating=this.getAttribute('rating')
        let rangeOf=this.getAttribute('rangeOf') 
        let percentage=parseFloat((rating)/parseFloat(rangeOf)||5) *100;
        this.shadowRoot.querySelector('.stars-background .fa-stars').style.width=`${percentage}%`

    } 
}
customElements.define('star-rating',StarRating)