import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContentWrapper,
} from "./../../components/atoms/tabs";
import { CardRotateAnimationWrapper } from "@/components/atoms/CardRotateAnimationWrapper";
import { v4 as uuidv4 } from "uuid";
import { IData } from "@/types/type";

export const ResumeTabs = (resume: IData["resume"]) => {
  const { about, experience, skills } = resume;

  return (
    <Tabs
      defaultValue="about"
      className="flex flex-col mdl:flex-row gap-14 w-full"
    >
      <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
        <TabsTrigger value="about">About me</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
      </TabsList>

      <div className="min-h-[70vh] w-full">
        <TabsContent value="about" className="w-full">
          <TabsContentWrapper {...about}>
            <div className="grid grid-cols-1 sm:grid-cols-2 mdl:grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4 mx-auto mdl:mx-0 max-w-2xl">
              {about.info.map((elm) => {
                return (
                  <div
                    key={uuidv4()}
                    className="flex justify-center sm:justify-start gap-1"
                  >
                    <p className="text-white/40 font-semibold">
                      {elm.fieldName}
                      <span className="text-accent">:</span>
                    </p>
                    <p className="text-pretty text-left">{elm.fieldValue}</p>
                  </div>
                );
              })}
            </div>
          </TabsContentWrapper>
        </TabsContent>
        <TabsContent value="skills" className="w-full">
          <TabsContentWrapper {...skills}>
            <div className="flex flex-wrap justify-center max-w-2xl mx-auto mdl:mx-0 mdl:w-full mdl:justify-start">
              {skills.technologies.map((tech) => {
                return (
                  <div key={uuidv4()} className="w-20 h-20">
                    {/* <SkillBall icon={tech.icon} /> */}
                  </div>
                );
              })}
            </div>
          </TabsContentWrapper>
        </TabsContent>
        <TabsContent value="experience" className="w-full">
          <TabsContentWrapper {...experience}>
            <ul className="flex">
              {experience.items.map((elm, index) => {
                return (
                  <div
                    key={uuidv4()}
                    className="w-full max-w-96 mx-auto mdl:mx-0"
                  >
                    <CardRotateAnimationWrapper index={index}>
                      <li
                        key={uuidv4()}
                        className="bg-[#232329] py-6 px-10 rounded-xl flex flex-col justify-center items-center mdl:items-start gap-1"
                      >
                        <span className="text-accent">{elm.duration}</span>
                        <h3 className="text-xl min-h-spacing-60 text-center mdl:text-left">
                          {elm.position}
                        </h3>
                        <div>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <p className="text-white/60">{elm.company}</p>
                        </div>
                      </li>
                    </CardRotateAnimationWrapper>
                  </div>
                );
              })}
            </ul>
          </TabsContentWrapper>
        </TabsContent>
      </div>
    </Tabs>
  );
};
