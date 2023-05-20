import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FacilityPage() {
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/facilities?populate=*');
                setFacilities(response.data.data);
                console.log(response.data.data);
                console.log(response.data.data.attributes.image.data.attributes.url);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFacilities();
    }, []);

    const handleSubmitReview = async () => {
        if (reviewText == '') {
            alert("Please write a review")
        } else {
            try {
                await axios.post('http://localhost:1337/api/reviews', {
                    data: {
                        review: reviewText,
                        facility: {
                            set: [{ id: selectedFacility.id }],
                        },
                    },
                });
                setReviewText('');
                setSelectedFacility(null);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="">
            <section class="bg-white dark:bg-gray-900">
                <div class="container px-6 py-10 mx-auto">
                    <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Write reviews for facility</h1>
                    <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">

                        {facilities.map((faculty) => (
                            <div
                                key={faculty.id}
                                class="lg:flex"
                                onClick={() => setSelectedFacility(faculty)}
                            >
                                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src={`http://localhost:1337${faculty.attributes.image.data.attributes.url}`} alt="" />

                                <div class="flex flex-col justify-between py-6 lg:mx-6">

                                    <a href="#" class="text-2xl font-semibold text-gray-800 hover:underline dark:text-white ">
                                        Facility name: {faculty.attributes.name}
                                    </a>
                                    <a href="#" class="text-xl font-normal text-justify text-gray-800 dark:text-white ">
                                        {faculty.attributes.description}
                                    </a>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedFacility && (
                <div className="fixed inset-0 flex items-center justify-center modal-overlay" >
                    <div className="bg-white rounded-lg p-4 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Submit Review for {selectedFacility.attributes.name}</h2>
                            {/* <button className="text-gray-500" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button> */}
                        </div>
                        <input
                            type="text"
                            className="border rounded-lg p-2 w-full mb-2"
                            placeholder="Enter review text"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={handleSubmitReview}>
                            Submit Review
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}