import { Loader } from 'lucide-react'

function loading() {
    return (
        <div className="flex min-h-screen justify-center items-center text-xl w-full">
            <Loader className="w-10 h-10 text-blueDark animate-spin" />
        </div>

    )
}

export default loading