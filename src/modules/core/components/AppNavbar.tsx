import React from "react";


const AppNavbar = () => {

    return (
        <React.Fragment>
            <div className="flex flex-col justify-between w-full h-full pt-16 overflow-x-auto">
                <div className="h-[85vh] overflow-x-auto">
                    <div className="w-full border-t border-secondary dark:border-slate-400">
                            <ul className="p-2 flex flex-col gap-2">
                               <li className="">
                                <button className="app-container-fade w-full h-10">
                                    d
                                </button>
                               </li>
                               
                            </ul>
                    </div>
                </div>
                <div className="h-[15vh] overflow-hidden border-t border-secondary dark:border-slate-400">
                   <div>

                   </div>
                </div>
            </div>
        </React.Fragment>
    );
};


export default AppNavbar;