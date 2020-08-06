// @flow

import React, { Fragment } from "react";
import { trackIds, tracks, categoryColorScale } from "../constants";
import type { MilestoneMap, TrackId } from "../constants";

type Props = {
  milestoneByTrack: MilestoneMap,
  focusedTrackId: TrackId,
  setFocusedTrackIdFn: (TrackId) => void,
};

let map = {};
let bucket_map = {};
const category_map = {
  A: "Team Work",
  B: "Innovation",
  C: "Results",
  D: "Impact",
};

class TrackSelector extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentCategory: null,
    };
  }

  componentWillMount() {
    trackIds.map((trackId) => {
      if (map.hasOwnProperty(trackId)) {
        map[trackId].push(tracks[trackId]);
      } else {
        map[trackId] = [];
        map[trackId].push(tracks[trackId]);
      }
    });

    Object.keys(map).map((s_key) => {
      if (bucket_map.hasOwnProperty(map[s_key][0].category)) {
        map[s_key][0].trackId = s_key;
        bucket_map[map[s_key][0].category].push(map[s_key][0]);
      } else {
        bucket_map[map[s_key][0].category] = [];
        map[s_key][0].trackId = s_key;
        bucket_map[map[s_key][0].category].push(map[s_key][0]);
      }
    });
  }

  render() {
    return (
      <div>
        <style jsx>{`
          .track-selector {
            width: 100%;
            border-spacing: 3px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 20px;
            margin-top: 20px;
            margin-bottom: 20px;
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
            margin-top: 5px;
            font-size: 9px;
          }
          .bucket {
            display: flex;
          }
          .category {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: 600;
          }
        `}</style>
        <div className="track-selector" style={{ display: "flex" }}>
          {Object.keys(bucket_map).map((s_key) => (
            <div>
              <div className="category">{category_map[s_key]}</div>
              <div
                className="bucket"
                style={{
                  display: "flex",
                  padding: "10px 5px",
                  marginRight: "10px",
                  borderTop: "4px solid " + categoryColorScale(s_key),
                  borderLeft: "4px solid " + categoryColorScale(s_key),
                  borderRight: "4px solid " + categoryColorScale(s_key),
                  minHeight: "100px",
                }}
              >
                {bucket_map[s_key].map((cat, index) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      key={`${cat.trackId}-${index}-value`}
                      className="track-selector-value"
                      style={{
                        marginRight: "5px",
                        border:
                          "4px solid " +
                          (cat.trackId == this.props.focusedTrackId
                            ? "#000"
                            : categoryColorScale(tracks[cat.trackId].category)),
                        background: categoryColorScale(
                          tracks[cat.trackId].category
                        ),
                      }}
                      onClick={() =>
                        this.props.setFocusedTrackIdFn(cat.trackId)
                      }
                    >
                      {this.props.milestoneByTrack[cat.trackId]}
                    </div>
                    <div
                      key={`${cat.trackId}-${index}-label`}
                      className="track-selector-label"
                      onClick={() =>
                        this.props.setFocusedTrackIdFn(cat.trackId)
                      }
                    >
                      {tracks[cat.trackId].displayName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TrackSelector;
