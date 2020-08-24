zoomPicture(photoId,zoomId);



function zoomPicture(photoID,zoomID){
    const photo=document.getElementById("photoId");
    const zoom=document.getElementById("zoomId");
    
    //create lens
    let lens=document.createElement("div");
    lens.setAttribute("class","zoom-lens");
    //The parentElement property returns the parent element of the specified element.
    //The difference between parentElement and parentNode, is that parentElement returns null
    // if the parent node is not an element node.In most cases, it does not matter which property you use.

    //insertBefore syntax: node.insertBefore(newnode, existingnode)
    photo.parentElement.insertBefore(lens,photo);

    //DOM offsetWidth property:The offsetWidth property returns the viewable width of an element in pixels,
    // including padding, border and scrollbar, but not the margin.
    //ratio between zoom and the lens:
    //how much you zoom the lens-part of the original photo
    //so that the zoom-div will show EXACTLY the part of the original photo that is covered by the lens
    let cx=zoom.offsetWidth/lens.offsetWidth;
    let cy=zoom.offsetHeight/lens.offsetHeight;

    //the zoom div properties:
    zoom.style.backgroundImage="url('"+photo.src+"')";
    //define the zoom in the zoom-div element:
    zoom.style.backgroundSize= (cx*photo.width)+"px "+(cy*photo.height)+"px";

    //execute a function when someone moves the cursor over the photo or the lens:
    lens.addEventListener("mousemove", moveLens);
    photo.addEventListener("mousemove", moveLens);

    //define moveLens():
    function moveLens(e){
        //The preventDefault() method cancels the event if it is cancelable [Not all events are cancelable. 
        //Use the cancelable property to find out if an event is cancelable]
        // meaning that the default action that belongs to the event will not occur.
        //prevent any other actions that may occur when moving over the image:
        e.preventDefault();  

        //get the CURSOR'S position :
        let pos=getCursorPos(e);

        //Get the position of the lens:
        // the cursor has to be centered inside the lens so OBVIOUSLY subtract the center of 
        // the lens from the cursor position in order to get the correct lens position:
        let x=pos.x - (lens.offsetWidth/2);   
        let y=pos.y-(lens.offsetHeight/2);
        
        //prevent the lens from getting outside the image:
        //right limit:
        if(x>photo.width-lens.offsetWidth){
            x=photo.width-lens.offsetWidth;
        }
        //left limit:
        if(x<0){
            x=0;
        }
        //up limit:
        if(y<0){
            y=0;
        }
        //down limit:
        if(y>photo.height-lens.offsetHeight){
            y=photo.height-lens.offsetHeight;
        }

        //set the position of the lens on the screen according to its movement:
        lens.style.left=x+"px";
        lens.style.top=y+"px";
       
        

        //display what the lens sees : the zoom is displayed in the zoom-div element
        //WOW!!!!!!: we use negative pixels to expand OUTSIDE the original fixed size of the image 
        //because we want to enlarge it in order to have the zoom effect
        zoom.style.backgroundPosition="-"+ (x*cx)+"px -"+(y*cy) +"px";

    }

    //function to get the cursor position
    // !!pageX property returns the horizontal coordinate (with regard to the document=web page) of the mouse pointer 
    //when a mouse event was triggered.
    // !!getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    //This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.
    function getCursorPos(e){
        //get the x and y positions of the image:(its upper left corner position)
        let a=photo.getBoundingClientRect();

        //calculate the cursor's x and y coordinates, relative to THE IMAGE !!!!!:
        //remember that a is the position OF THE TOP LEFT CORNER OF THE IMAGE]
        x = e.pageX-a.left;
        y = e.pageY-a.top;

        return {x,y}; // return an object{} in JS to get multiple values !!!!!!!!

    }
    
    
}
