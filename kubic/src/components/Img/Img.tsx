
import Image from "next/image";
import styles from "./styles.module.scss";
import {ImgProps, layoutType} from "./types";

export default function Img(props: ImgProps) {

    let layout = undefined as layoutType;
    if(!props.width && !props.height){
        layout = 'fill'; 
    }

    

    return (
        <span 
            className={styles.container + " " + props.className + " " +
            (props.contain ? styles.contain : styles.cover)}
        >

            <Image
                src={props.src}
                alt={props.alt}
                layout={layout}

                width={props.width}
                height={props.height}
                className={props.imageClassName + " " + styles.imageElement}
                priority={props.priority}
                quality={props.quality}

                blurDataURL="/images/loading-buffering.gif" 
                placeholder="blur"

                title={props.title}
                objectFit={"contain"}
                draggable={false}
                objectPosition={"center"}
                unoptimized
                onLoadingComplete={props.onLoadingComplete}
                
            />
        </span>
    )
}
