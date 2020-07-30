// @flow

import {
  pointsToLevels,
  milestoneToPoints,
  trackIds,
  totalPointsFromMilestoneMap,
  tracks,
} from "../constants";
import type { MilestoneMap } from "../constants";
import React from "react";

type Props = {
  milestoneByTrack: MilestoneMap,
};

class PointSummaries extends React.Component<Props> {
  render() {
    //const totalPoints = totalPointsFromMilestoneMap(this.props.milestoneByTrack)

    let totalPoints = parseFloat("0");
    let nameLabel = this.props.label;
    for (const [key, value] of Object.entries(this.props.milestoneByTrack)) {
      totalPoints = totalPoints + parseFloat(value);
    }
    let currentLevel;

    let averagePoints = totalPoints / trackIds.length;
    let decimals = averagePoints - parseInt(averagePoints);
    let finalPoints =
      decimals > 0.74 ? Math.ceil(averagePoints) : Math.floor(averagePoints);

    switch (finalPoints) {
      case 0:
        currentLevel = "N/A";
        break;
      case 1:
        currentLevel = "ICT 1";
        break;
      case 2:
        currentLevel = "ICT 2";
        break;
      case 3:
        currentLevel = "ICT 3";
        break;
      case 4:
        currentLevel = "ICT 4";
        break;
      case 5:
        currentLevel = "ICT 5";
        break;
      default:
        currentLevel = "N/A";
    }

    const blocks = [
      {
        label: "Assessed level",
        value: currentLevel,
      },
    ];

    return (
      <div>
        {blocks.map(({ label, value }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "160px",
            }}
          >
            <style jsx>{`
              .label {
                font-size: 14px;
                text-align: center;
                font-weight: normal;
                width: 120px;
              }
              .value {
                width: 120px;
                background: #eee;
                font-size: 24px;
                font-weight: bold;
                line-height: 50px;
                border-radius: 2px;
                text-align: center;
              }
            `}</style>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              {nameLabel}
            </div>
            <div>
              <div className="label">{label}</div>
              <div className="value">{value}</div>
            </div>
          </div>
        ))}
      </div>
      // <table>
      //   <style jsx>{`
      //     table {
      //       border-spacing: 3px;
      //       margin-bottom: 20px;
      //       margin-left: 140px;
      //       margin-top: 140px;
      //     }
      //     .point-summary-label {
      //       font-size: 14px;
      //       text-align: center;
      //       font-weight: normal;
      //       width: 120px;
      //     }
      //     .point-summary-value {
      //       width: 120px;
      //       background: #eee;
      //       font-size: 24px;
      //       font-weight: bold;
      //       line-height: 50px;
      //       border-radius: 2px;
      //       text-align: center;
      //     }
      //   `}</style>
      //   <tbody>
      //     <tr>
      //       {blocks.map(({ label }, i) => (
      //         <th key={i} className="point-summary-label">
      //           {label}
      //         </th>
      //       ))}
      //     </tr>
      //     <tr>
      //       {blocks.map(({ value }, i) => (
      //         <td key={i} className="point-summary-value">
      //           {value}
      //         </td>
      //       ))}
      //     </tr>
      //   </tbody>
      // </table>
    );
  }
}

export default PointSummaries;
