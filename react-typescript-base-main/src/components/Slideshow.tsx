import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};
const slideImages = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCFxvAVStUlz3xSsp2KvZeWAKPxcrdEH8RTw&s",
    caption: "",
  },
  {
    url: "https://png.pngtree.com/thumb_back/fw800/background/20231221/pngtree-poster-banner-template-with-abstract-gradient-gray-background-image_15545077.png",
    caption: "",
  },
  {
    url: "https://media.istockphoto.com/id/1292445025/vector/gray-background-abstract-light-lines-wide-web-banner-white-technology-backdrop-smooth.jpg?s=1024x1024&w=is&k=20&c=aSDWl5CqujYoZzMQ6sOPUR2JllgFdx1yfdFlXm-5RvM=",
    caption: "",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
export default Slideshow;
