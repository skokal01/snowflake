// @flow

import React from "react";
import { trackIds, tracks, categoryColorScale } from "../constants";
import type { MilestoneMap, TrackId } from "../constants";

type Props = {
  milestoneByTrack: MilestoneMap,
  focusedTrackId: TrackId,
  setFocusedTrackIdFn: (TrackId) => void,
};

// const arr = [
//   {
//     label: "Mobile",
//     value: 1,
//   },
//   {
//     label: "Web Client",
//     value: 2,
//   },
//   {
//     label: "Foundations",
//     value: 3,
//   },
//   {
//     label: "Project Management",
//     value: 4,
//   },
// ];

let sections = {};
let final_arr;

class NewTrackSelector extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentCategory: null,
      categoryArray: []
    };

    this.fetchCategoryMap = this.fetchCategoryMap.bind(this)
  }

  componentWillMount() {
    final_arr = trackIds.map((trackId) => {
      if (!sections.hasOwnProperty(tracks[trackId].category)) {
        sections[tracks[trackId].category] = [];
        sections[tracks[trackId].category].push({
          trackId: trackId,
          label: tracks[trackId].displayName,
          value: this.props.milestoneByTrack[trackId]
        })
      } else {
        sections[tracks[trackId].category].push({
          label: tracks[trackId].displayName,
          value: this.props.milestoneByTrack[trackId]
        })
      }
      return sections;
    });
  }

  fetchCategoryMap() {
    final_arr = trackIds.map((trackId) => {
      if (!sections.hasOwnProperty(tracks[trackId].category)) {
        sections[tracks[trackId].category] = [];
        sections[tracks[trackId].category].push({
          label: tracks[trackId].displayName,
          value: this.props.milestoneByTrack[trackId]
        })
      } else {
        sections[tracks[trackId].category].push({
          label: tracks[trackId].displayName,
          value: this.props.milestoneByTrack[trackId]
        })
      }
    })

    return final_arr
  }
  render() {
    return (
      <div style={{ display: "flex", flexGap: 15, maxWidth: "100px" }}>
        <style jsx>{`
          .value {
            line-height: 50px;
            width: 50px;
            padding: 10px;
            text-align: center;
            background: #eee;
            font-weight: bold;
            font-size: 24px;
            border-radius: 3px;
            cursor: pointer;
          }
          .label {
            justify-content: center;
            align-items: flex-start;
            font-size: 9px;
          }

          .track-selector-value {
            line-height: 50px;
            width: 50px;
            text-align: center;
            background: #eee;
            font-weight: bold;
            font-size: 24px;
            border-radius: 3px;
            cursor: pointer;
          }
          .track-selector-label {
            text-align: center;
            font-size: 9px;
          }

          .grid {
            display: flex;
          }

          .categories {
            display: flex;
            margin: 10px 2px;
            padding: 5px
          }

          .categories_inner {
            margin-right: 5px;
          }
        `}</style>
        <div className="grid">
          {
            Object.keys(final_arr[0]).map((k, index) => {
              console.log(final_arr[0][k])
              return (
                <div className="categories" key={`key-${index}`} style={{
                  border: 'none',
                }}>
                  <div style={{
                    display: 'flex',
                    padding: '10px 5px',
                    borderTop:
                      "4px solid " + categoryColorScale(k),
                    borderLeft:
                      "4px solid " + categoryColorScale(k),
                    borderRight:
                      "4px solid " + categoryColorScale(k),
                  }}>
                    {
                      final_arr[0][k].map((a, index) => (
                        <div className="categories_inner" key={`inner-key-${index}`}>
                          <div className="track-selector-value" style={{
                            border:
                              "4px solid " +
                              (k == this.props.focusedTrackId
                                ? "#000"
                                : categoryColorScale(k)),
                            background: categoryColorScale(k),
                          }}
                            onClick={() => this.props.setFocusedTrackIdFn(final_arr[0][k].trackId)}>
                            {a.value}
                          </div>
                          <div className="track-selector-label">{a.label}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default NewTrackSelector;


// {/* {arr.map((a) => {
//             return (
//               <div className="col">
//                 <div className="label">{a.label}</div>
//                 <div className="value">{a.value}</div>
//               </div>
//             );
//           })} 




                // <div>
                //   <div
                //     key={trackId}
                //     className="track-selector-value"
                //     style={{
                //       border:
                //         "4px solid " +
                //         (trackId == this.props.focusedTrackId
                //           ? "#000"
                //           : categoryColorScale(tracks[trackId].category)),
                //       background: categoryColorScale(tracks[trackId].category),
                //     }}
                //     onClick={() => this.props.setFocusedTrackIdFn(trackId)}
                //   >
                //     {this.props.milestoneByTrack[trackId]}
                //   </div>
                // </div> */}