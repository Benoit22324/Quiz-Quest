import type Run from "../../../domain/entities/Run"
import { RunView } from "./RunView"

export type RunDisplayProps = {
    runs: Run[] | null
}

export const RunDisplay = ({ runs }: RunDisplayProps) => {
    return <>
        <div className="run_display_component">
            {
                (runs && runs.length > 0) ? runs.map(run => <RunView run={run} key={run.getId()} />)
                : <p className="run_display_error">You didn't play any Quiz yet.</p>
            }
        </div>
    </>
}