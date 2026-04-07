export default function Test() {
    return (
        <div className="grid grid-cols-9 grid-rows-8 gap-4">
            <div className="col-span-2 row-span-9">1</div>
            <div className="col-span-2 row-span-2 col-start-8 row-start-1">2</div>
            <div className="col-span-2 row-span-7 col-start-8 row-start-3">3</div>
            <div className="col-span-5 row-span-3 col-start-3 row-start-1">4</div>
            <div className="col-span-3 row-span-3 col-start-3 row-start-4">5</div>
            <div className="col-span-2 row-span-3 col-start-6 row-start-4">6</div>
            <div className="col-span-5 row-span-3 col-start-3 row-start-7">7</div>
        </div>
    )
}
