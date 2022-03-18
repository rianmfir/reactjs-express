import LoadingSpin from "react-loading-spin";

const Loading = ({ loadStyle }) => {
    return (
        <div className={loadStyle}>
            <LoadingSpin
                duration="2s"
                width="10px"
                timingFunction="ease-in-out"
                direction="alternate"
                size="50px"
                primaryColor="#ee5253"
                numberOfRotationsInAnimation={6}
            />
        </div>
    )
}

export default Loading;