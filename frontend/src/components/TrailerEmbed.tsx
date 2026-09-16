interface TrailerEmbedProps {
    videoKey: string
}

function TrailerEmbed({ videoKey }: TrailerEmbedProps) {
    return (
        <div className="w-full aspect-video">
            <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}

export default TrailerEmbed