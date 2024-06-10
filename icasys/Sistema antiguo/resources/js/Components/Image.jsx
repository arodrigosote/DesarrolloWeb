export default function Image({ url, alt, className = '', ...props }) {
    return (
        <img {...props} src={url} alt={alt} className={` ${className}`} />
    );
}
