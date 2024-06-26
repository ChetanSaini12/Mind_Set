import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';

const TakeUserDetails = (props) => {
    const { handleChange, handleSubmit, loggedIn, imageFileUploadProgress,
        isLoading, Button_Text, profilePic, formData, setFormData } = props;

    // console.log("user-> ",formData);

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <form className="flex flex-col gap-4 align-items:center" onSubmit={handleSubmit}>
                <input type='file' accept='image/*' hidden></input>
                <div className=' border self-center cursor-pointer shadow-md overflow-hidden rounded-xl' >
                    <img src={profilePic} alt="user" className={` h-32 w-32 sm:max-h-40 sm:w-42 object-cover border-1  border-[lightgray] `} />
                    {imageFileUploadProgress && imageFileUploadProgress < 100 &&
                        <CircularProgressbar
                            value={imageFileUploadProgress||0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 1,
                                    left: 5,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                                        })`,
                                },
                            }}
                        />
                    }

                </div>
                <div>
                    <Label value="Username*"></Label>
                    <TextInput
                        required
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={formData?.username ? formData.username : ""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Full Name*"></Label>
                    <TextInput
                        required
                        type="text"
                        placeholder="John Doe"
                        id="name"
                        value={formData?.name ? formData.name : ""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Contact*"></Label>
                    <TextInput
                        required
                        type="text"
                        placeholder="0000000000"
                        id="mobileNum"
                        maxLength={10}
                        minLength={10}
                        value={formData?.mobileNum ? formData.mobileNum : ""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Enrollment Number*"></Label>
                    <TextInput
                        required
                        type="text"
                        placeholder="21UEE055"
                        id="collegeId"
                        value={formData?.collegeId ? formData.collegeId : ""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Graduation Year*"></Label>
                    <TextInput
                        required
                        type="Integer"
                        placeholder="2025"
                        id="graduationYear"
                        value={formData?.graduationYear ? formData.graduationYear : ""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="College*"></Label>
                    <Select
                        required
                        id="college"
                        name="college"
                        value={formData?.college ? formData.college : ""}
                        onChange={handleChange}
                    >
                        <option selected>Choose your College </option>
                        <option value="NIT AGARTALA">NIT AGARTALA</option>
                        <option value="IIIT AGARTALA">IIIT AGARTALA</option>

                    </Select>
                </div>
                <div>
                    <Label value="Course*"></Label>
                    <Select
                        required
                        id="course"
                        name="course"
                        value={formData?.course ? formData.course : ""}
                        onChange={handleChange}
                    >
                        <option selected>Choose your Course </option>
                        <option value="BTech">BTech</option>
                        <option value="MCA">MCA</option>
                        <option value="MTech">MTech</option>

                    </Select>
                </div>

                <div>
                    <Label value="CGPA*" ></Label>
                    <TextInput
                        required
                        type="float"
                        placeholder="9.23"
                        id="cgpa"
                        pattern='^(?:10(?:\.0+)?|\d(\.\d{1,2})?)$'
                        value={formData?.cgpa ? formData.cgpa : ""}
                        onChange={handleChange}
                    ></TextInput>


                </div>

                <div>
                    <Label value="State*"></Label>
                    <TextInput
                        required
                        type="text"
                        placeholder="Rajasthan"
                        id="state"
                        value={formData?.state ? formData.state : ""}
                        onChange={handleChange}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Hosteller*"></Label>
                    <Select
                        required
                        id="hosteler"
                        name="hosteller"
                        value={formData?.hosteler ? formData.hosteler : ""}
                        onChange={handleChange}
                    >
                        <option selected>Are you hosteller</option>

                        <option value="true">YES</option>
                        <option value="false">NO</option>

                    </Select>
                </div>
                <div>
                    <Label value="Gender*"></Label>
                    <Select
                        required
                        id="gender"
                        name="gender"
                        value={formData.gender ? formData.gender : ""}
                        onChange={handleChange}
                        defaultValue={"Choose your gender"}
                    >
                        <option selected>Choose your gender </option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="TRANSGENDER">TRANSGENDER</option>
                        <option value="PREFER_NOT_TO_SAY">PREFER_NOT_TO_SAY</option>
                    </Select>

                </div>

                <div>
                    <Label value="Department*"></Label>
                    <Select
                        required
                        id="department"
                        name="department"
                        onChange={handleChange}
                        value={formData.department ? formData.department : ""}
                    >
                        <option selected>Choose Your Department </option>
                        <option value="COMPUTER_SCIENCE_AND_ENGINEERING">CSE</option>
                        <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">ECE</option>
                        <option value="ELECTRICAL_ENGINEERING">EE</option>
                        <option value="ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING">EI</option>
                        <option value="MECHANICAL_ENGINEERING">Mechanical</option>
                        <option value="CHEMICAL_ENGINEERING">Chemical</option>
                        <option value="CIVIL_ENGINEERING">Civil</option>
                        <option value="PRODUCTION_ENGINEERING">Production</option>
                        <option value="BIO_TECH_AND_BIO_ENGINEERING">Bio_Tech</option>
                    </Select>
                </div>
                <div>
                    <Label value="Leetcode Profile"></Label>
                    <TextInput
                        type="text"
                        placeholder="https://leetcode.com/username/"
                        id="leetcodeProfile"
                        onChange={handleChange}
                        value={formData?.leetcodeProfile ? formData.leetcodeProfile : ""}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Codeforces Profile"></Label>
                    <TextInput
                        type="text"
                        placeholder="https://codeforces.com/username/"
                        id="codeforcesProfile"
                        onChange={handleChange}
                        value={formData?.codeforcesProfile ? formData.codeforcesProfile : ""}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Linkedin Profile"></Label>
                    <TextInput
                        type="text"
                        placeholder="https://linkedin.com/username/"
                        id="linkedinProfile"
                        onChange={handleChange}
                        value={formData?.linkedinProfile ? formData.linkedinProfile : ""}
                    ></TextInput>
                </div>
                <div>
                    <Label value="Github Profile"></Label>
                    <TextInput
                        type="text"
                        placeholder="https://github.com/username/ "
                        id="githubProfile"
                        value={formData?.githubProfile ? formData.githubProfile : ""}
                        onChange={handleChange}
                    ></TextInput>
                </div>

                <Button
                    gradientDuoTone="purpleToPink"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Spinner size="sm"></Spinner>
                            <span>Loading...</span>
                        </>
                    ) : (
                        Button_Text
                    )}
                </Button>
            </form>

            {/* {error && (
                <Alert className="mt-5" color="failure">
                  {error}
                </Alert>
              )} */}
        </div>
    )
}

export default TakeUserDetails;