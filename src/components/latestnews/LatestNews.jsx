import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { MdArrowDropDown } from "react-icons/md"
import News from './News'
const people = [
    {
        id: 1,
        name: 'All',
        avatar:
            '/images/doc.svg',
    },
    {
        id: 2,
        name: 'Text',
        avatar:
            '/images/doc.svg',
    },
    {
        id: 3,
        name: 'Code',
        avatar:
            '/images/doc.svg',
    },
    {
        id: 4,
        name: 'Audio',
        avatar:
            '/images/doc.svg',
    },
    {
        id: 5,
        name: 'Video',
        avatar:
            '/images/doc.svg',
    },
    {
        id: 6,
        name: 'Business',
        avatar:
            '/images/doc.svg',
    },
    {
        id: 7,
        name: 'Image',
        avatar:
            '/images/doc.svg',
    },
]
const people2 = [
    {
        id: 1,
        name: 'New',
        avatar:
            '/images/time.svg',
    },
    {
        id: 2,
        name: 'Old',
        avatar:
            '/images/time.svg',
    }
    // ,
    // {
    //     id: 3,
    //     name: 'New',
    //     avatar:
    //         '/images/time.svg',
    // },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const LatestNews = () => {
    const [selected, setSelected] = useState(people[0])
    const [selected2, setSelected2] = useState(people2[0])
    console.log("selected naaame::",selected2.name)



    return (
        <div>
            <div className='absolute md:block hidden r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl'></div>
            <div className='absolute left-0 bg-[#2CD7834F]/10 w-[338px] h-[338px] rounded-full blur-3xl'></div>
            <div className='flex flex-col text-center justify-center items-center'>
                <h1 className="text-[32px] md:text-[40px] font-[800] bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                    Latest AI News
                </h1>
                <p className='text-[18px] font-[500] text-black dark:text-[#FFF] md:px-[15rem] pt-5'>
                    These are the Latest News about AI Tools. There are also old news about AI Tools.
                </p>

                <div className='flex items-center justify-center gap-6 md:gap-8 mt-12'>
                    <div className='flex flex-col '>
                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <Listbox.Label className="block text-left text-[16px] font-[400] leading-6 dark:text-white">Filter by Category</Listbox.Label>
                                    <div className="relative mt-2">
                                        <Listbox.Button className="w-[150px] md:w-[199px] h-[50px]  bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]">
                                            <span className="flex items-center bg-white dark:bg-primary-dark py-3 pl-5 rounded-md">
                                                <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 " />
                                                <span className="ml-3 block truncate">{selected.name}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center ">
                                                <MdArrowDropDown className="h-7 w-7 dark:text-white" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>

                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute py-2 px-2 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md backdrop-blur-md bg-custom-blue text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {people.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? ' rounded-md bg-primary-blue/20 dark:text-white' : 'dark:text-white',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center cursor-pointer">
                                                                    <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0" />
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {person.name}
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    <div className='flex flex-col '>
                        <Listbox value={selected2} onChange={setSelected2}>
                            {({ open }) => (
                                <>
                                    <Listbox.Label className="block text-left text-[16px] font-[400] leading-6 dark:text-white">Sort By</Listbox.Label>
                                    <div className="relative mt-2">
                                        <Listbox.Button className="w-[140px] md:w-[169px] h-[50px]  bg-gradient-to-br from-[#27B6D7] via-[#526bc454] to-[#15CADF54] bg-opacity-50 rounded-md mx-auto p-[1px]">
                                            <span className="flex items-center bg-white dark:bg-primary-dark py-3 pl-5 rounded-md">
                                                <img src={selected2.avatar} alt="" className="h-5 w-5 flex-shrink-0 " />
                                                <span className="ml-3 block truncate">{selected2.name}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center ">
                                                <MdArrowDropDown className="h-7 w-7 dark:text-white" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>

                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 p-2 mt-1 max-h-56 w-full overflow-auto rounded-md backdrop-blur-md bg-custom-blue text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {people2.map((person2) => (
                                                    <Listbox.Option
                                                        key={person2.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? ' rounded-md bg-primary-blue/20 dark:text-white' : 'dark:text-white',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={person2}
                                                    >
                                                        {({ selected2, active }) => (
                                                            <>
                                                                <div className="flex items-center cursor-pointer">
                                                                    <img src={person2.avatar} alt="" className="h-5 w-5 flex-shrink-0" />
                                                                    <span
                                                                        className={classNames(selected2 ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {person2.name}
                                                                    </span>
                                                                </div>


                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                </div>
                <div>
                    <News Category={selected.name} SortBy={selected2.name}/>
                </div>
                {/* <div className='mb-20'>
                    <button className="font-[500] text-[18px] w-[153px] h-[50px] z-20   dark:text-white border border-[#15CADF] bg-transparent rounded-md">
                        View All
                    </button>
                </div> */}


            </div>
            <div className='absolute r bg-[#2CD7834F]/10 w-[338px] h-[338px] right-0 rounded-full blur-3xl'></div>
        </div>
    );
};

export default LatestNews;
