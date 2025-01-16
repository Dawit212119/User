

                                     //////////////      schema  for request object 
                                     {
                                     trip: {
                                        type: String,
                                        required: true,
                                    },
                                    requests: [
                                        {
                                            userId: {
                                                type: String,
                                                required: true,
                                                unique: true,
                                            },
                                            submittedAt: {
                                                type: Date,
                                                default: Date.now,
                                            },
                                        },
                                    ],
                                }
                        
                                //     backend api
                                
                                
                                 async (req, res) => {
                                    const { trip, userId } = req.body;
                                
                                    
                                        let submission = await Submission.findOne({ trip });
                                
                                        const existingRequest = submission.requests.find(request => request.userId === userId);
                                       
                                        if (existingRequest) {
                                            const time = 30 * 60 * 1000;
                                  const elapsed =
                                    Date.now() - new Date(existingRequest.requests.submittedAt).getDate();
                                    if(elapsed < time )
                                            return res.status(400).json({ message: 'You have already submitted a request for this trip.' });
                                        }
                            
                                      
                                        submission.requests.push({ userId, submittedAt: Date.now() });
                                        await submission.save();
                                                    
                                        return res.status(200).json({ message: 'Trip request submitted successfully!' });
                                
                                    
                                };