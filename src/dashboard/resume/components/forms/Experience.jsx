import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import {
  LoaderCircle,
  CheckCircle2,
  BriefcaseBusiness,
  Plus,
  Minus,
} from "lucide-react";

function Experience() {
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    resumeInfo?.Experience?.length > 0 &&
      setExperinceList(resumeInfo?.Experience);
  }, []);

  const handleChange = (index, event) => {
    setSaved(false);
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperinceList((prev) => prev.slice(0, -1));
  };

  const handleRichTextEditor = (value, name, index) => {
    setSaved(false);
    const newEntries = experinceList.slice();
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, Experience: experinceList }));
  }, [experinceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: { Experience: experinceList.map(({ id, ...rest }) => rest) },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      () => {
        setLoading(false);
        setSaved(true);
        toast("Details updated!");
        setTimeout(() => setSaved(false), 2500);
      },
      () => {
        setLoading(false);
        toast("Server error, try again");
      },
    );
  };

  return (
    <div className="form-section-card">
      <h2 className="form-section-title">Professional Experience</h2>
      <p className="form-section-subtitle">Add your previous job experience</p>

      {/* Empty state */}
      {experinceList.length === 0 && (
        <div className="form-empty-state">
          <BriefcaseBusiness className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">No experience added yet</p>
          <p className="text-xs text-gray-300 mt-1">
            Click "+ Add Experience" to get started
          </p>
        </div>
      )}

      <div>
        {experinceList.map((item, index) => (
          <div key={index} className="form-entry-card">
            <div className="form-entry-header">
              <span className="form-entry-index">#{index + 1}</span>
              <span className="text-sm font-medium text-gray-600 truncate">
                {item?.title || item?.companyName || "New Entry"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="form-label">Position Title</label>
                <Input
                  name="title"
                  className="form-input"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.title}
                />
              </div>
              <div>
                <label className="form-label">Company Name</label>
                <Input
                  name="companyName"
                  className="form-input"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.companyName}
                />
              </div>
              <div>
                <label className="form-label">City</label>
                <Input
                  name="city"
                  className="form-input"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.city}
                />
              </div>
              <div>
                <label className="form-label">State</label>
                <Input
                  name="state"
                  className="form-input"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.state}
                />
              </div>
              <div>
                <label className="form-label">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  className="form-input"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  className="form-input"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummery}
                  onRichTextEditorChange={(value) =>
                    handleRichTextEditor(value, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="form-footer">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewExperience}
            className="text-primary border-primary/30 hover:bg-primary/5 gap-1.5 text-sm"
          >
            <Plus className="h-3.5 w-3.5" /> Add Experience
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
            disabled={experinceList.length === 0}
            className="text-gray-500 border-gray-200 hover:bg-gray-50 gap-1.5 text-sm"
          >
            <Minus className="h-3.5 w-3.5" /> Remove
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={onSave}
          className={saved ? "btn-saved" : ""}
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : saved ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1" /> Saved!
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
