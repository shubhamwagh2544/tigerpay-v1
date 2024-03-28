import homepage from '../assets/homepage.jpg'

export default function HomePage() {
    return (
        <div>
            <img
                className="w-full h-full object-cover"
                src={homepage}
                alt="homepage" />
        </div>
    )
} 