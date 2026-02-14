export default function Footer() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm  text-black/70">
                <div className="flex items-center ">
                <p>Copyright © 2026 FlowFroge. All rights reservered.</p>
                   
                </div>
            </footer>
        </>
    );
};