import Image from "next/image";
export default function product(){
    return(
        <div className="product">
            <div className="card">
                <Image/>
                <h3 classname="item_name"></h3>
            </div>
        </div>
    );
}